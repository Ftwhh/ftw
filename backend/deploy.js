const { exec } = require('child_process');

function deployProject(projectName, repoUrl) {
    console.log(`Deploying ${projectName} from ${repoUrl}...`);
    exec(`railway init --template ${repoUrl} --name ${projectName}`, (err, stdout, stderr) => {
        if(err) return console.error(err);
        console.log(stdout);

        exec(`railway up --detach`, (err2, stdout2, stderr2) => {
            if(err2) return console.error(err2);
            console.log(stdout2);
        });
    });
}

module.exports = deployProject;
