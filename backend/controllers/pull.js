const fs = require('fs').promises;
const path = require('path');
const {s3 ,S3_BUCKET} =  require("../config/aws-config");
const { ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");

async function pullRepo(){
    const repoPath = path.resolve(process.cwd() , ".apnaGit");
    const commitPath =  path.join(repoPath , "commits");

    try{
        const data = await s3.send(new ListObjectsV2Command({
            Bucket: S3_BUCKET,
            Prefix: "commits/",
        }));

        const objects = data.Contents || [];

        for(const object of objects){
            const key = object.Key;
            const commitDir =  path.join(commitPath , path.dirname(key).split("/").pop());
            await fs.mkdir(commitDir , {recursive:true});

            const params = {
                Bucket : S3_BUCKET,
                Key :key
            };

            const { Body } = await s3.send(new GetObjectCommand(params));
            const filePath = path.join(repoPath, key);
            await fs.writeFile(filePath, await Body.transformToByteArray());
            
            console.log(`File ${key} pulled successfully!`);
        }
    }catch(err){
        console.error("error while pulling" , err);
    }
}

module.exports =  {pullRepo};