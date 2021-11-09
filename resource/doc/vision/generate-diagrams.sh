#!/bin/bash

vision --projectRootPath=../../.. --tsConfig=../../../tsconfig.json --destName=vision --printIgnoreExternal --printIgnoreTypes  --printIgnorePaths=src/old-tests,src/global-contract,src/types.d.ts,src/index.ts
