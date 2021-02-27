#!/usr/bin/env python3

from subprocess import run
import json
import shutil

version = json.loads(open("package.json").read())["version"]
# need shutil.which because:
# https://stackoverflow.com/questions/3022013/windows-cant-find-the-file-on-subprocess-call
run([shutil.which("vsce"), "package"], check=True) 
run([shutil.which("code"), "--install-extension", f"dj-{version}.vsix"], check=True)