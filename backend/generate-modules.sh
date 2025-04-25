#!/bin/bash

MODULES=("users" "projects" "bids" "milestones" "messages" "skills" "categories" "auth")

for module in "${MODULES[@]}"; do
  echo "Generating $module module..."

  nest g module $module
  nest g controller $module --no-spec
  nest g service $module --no-spec
  nest g class $module/${module%?}.entity --no-spec # removes plural 's' from folder name for entity

  mkdir -p src/$module/dto
  touch src/$module/dto/${module%?}-dto.ts

  echo "$module module generated ✅"
done
