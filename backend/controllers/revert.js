const fs = require("fs").promises;
const path = require('path'); 

async function revertRepo(commitID) {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const commitsPath = path.join(repoPath, "commits");
     
    try {
        const commitDir = path.join(commitsPath, commitID);
        const files = await fs.readdir(commitDir);
        const parentDir = path.resolve(repoPath, "..");

        for (const file of files) {
            const sourceFile = path.join(commitDir, file);
            const destFile = path.join(parentDir, file);
            await fs.copyFile(sourceFile, destFile);
        }

        console.log(`Commit ${commitID} reverted successfully!`);
    } catch (err) {
        console.error("eroor while reverting ", err);
    }

}

module.exports = { revertRepo };