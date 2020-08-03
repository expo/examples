#! /usr/bin/env node
const packagesJson=require('./package.json');
const walkSync = require('walk-sync');
const shell = require('shelljs');
const path=require('path');
const fs=require('fs');

const workspaces=packagesJson.workspaces;
const workspacePathArray = walkSync('./', { globs: workspaces });

workspacePathArray.map(workspacePathItem=>{
  const pathPackageJson=path.resolve(workspacePathItem,'package.json');
  if(fs.existsSync(pathPackageJson))
  {
    const command=`cd ${workspacePathItem} && expo-yarn-workspaces postinstall`;
    shell.exec(command);
  }
})