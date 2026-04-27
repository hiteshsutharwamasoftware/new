#!/usr/bin/env python3
"""Heuristically detect common setup/test/build/deploy commands for a repo.

This is intentionally conservative: it only suggests commands when it finds
strong signals (files/dirs). It never executes anything itself.
"""
from __future__ import annotations
from dataclasses import dataclass
from pathlib import Path
import json
import time

@dataclass
class Suggestions:
    setup: list[str]
    test: list[str]
    build: list[str]
    deploy: list[str]
    notes: list[str]

def exists(p: str) -> bool:
    return Path(p).exists()

def suggest() -> Suggestions:
    setup: list[str] = []
    test: list[str] = []
    build: list[str] = []
    deploy: list[str] = []
    notes: list[str] = []

    # Node / frontend
    if exists("package.json") or exists("frontend/package.json"):
        # Prefer npm ci when lockfile exists
        if exists("package-lock.json") or exists("frontend/package-lock.json"):
            if exists("frontend/package.json"):
                setup.append("cd frontend && npm ci")
            else:
                setup.append("npm ci")
        else:
            if exists("frontend/package.json"):
                setup.append("cd frontend && npm install")
            else:
                setup.append("npm install")

        # tests/build (common)
        if exists("frontend/package.json"):
            test.append("cd frontend && npm test")
            build.append("cd frontend && npm run build")
        else:
            test.append("npm test")
            build.append("npm run build")

        notes.append("Detected Node project (package.json).")

    # Python / backend
    if exists("pyproject.toml") or exists("requirements.txt") or exists("backend/requirements.txt") or exists("backend/pyproject.toml"):
        if exists("backend/requirements.txt"):
            setup.append("python -m pip install -r backend/requirements.txt")
        elif exists("requirements.txt"):
            setup.append("python -m pip install -r requirements.txt")
        else:
            # pyproject present; we won't assume packaging tool
            notes.append("Detected pyproject.toml; configure Python install command manually if needed.")

        # pytest detection
        if exists("backend") and (exists("backend/pytest.ini") or exists("backend/pyproject.toml") or exists("backend/tests") or exists("backend/src")):
            test.append("cd backend && pytest")
        elif exists("pytest.ini") or exists("tests"):
            test.append("pytest")

        notes.append("Detected Python project.")

    # Serverless hints for deploy (conservative)
    if exists("template.yaml") or exists("template.yml"):
        deploy.append("sam build")
        deploy.append("sam deploy --no-confirm-changeset --no-fail-on-empty-changeset --capabilities CAPABILITY_IAM")
        notes.append("Detected AWS SAM template (template.yaml). Review stack name/params.")
    elif exists("serverless.yml") or exists("serverless.yaml"):
        deploy.append("npx serverless deploy")
        notes.append("Detected Serverless Framework config.")
    elif exists("cdk.json"):
        deploy.append("npx cdk deploy --require-approval never")
        notes.append("Detected AWS CDK config.")

    return Suggestions(setup=dedupe(setup), test=dedupe(test), build=dedupe(build), deploy=dedupe(deploy), notes=dedupe(notes))

def dedupe(xs: list[str]) -> list[str]:
    seen = set()
    out = []
    for x in xs:
        x = x.strip()
        if not x or x in seen:
            continue
        seen.add(x)
        out.append(x)
    return out

if __name__ == "__main__":
    s = suggest()
    print(json.dumps({
        "detected_at": int(time.time()),
        "setup": s.setup,
        "test": s.test,
        "build": s.build,
        "deploy": s.deploy,
        "notes": s.notes,
    }, indent=2))
