@echo off
for %%f in (*.json) do mongoimport -d projetoEW -c acordaos --file %%f