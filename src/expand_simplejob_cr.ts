import { Configs } from 'kpt-functions';
import { isSimpleJob, SimpleJob } from "./gen/com.github.hideto0710.batch.v1";
import { CronJob } from "./gen/io.k8s.api.batch.v1beta1";

export async function expandSimpleJob(configs: Configs) {
    configs.get(isSimpleJob).forEach((simpleJob) => {
        configs.insert(createCronJob(simpleJob))
        configs.delete(simpleJob)
    })
}

function createCronJob(simpleJob: SimpleJob): CronJob {
    const { metadata, spec } = simpleJob;
    return new CronJob({
        metadata: {
            name: metadata.name
        },
        spec: {
            schedule: spec!.schedule!,
            jobTemplate: {
                spec: {
                    template: {
                        spec: {
                            containers: [{
                                name: "hello",
                                image: "docker/whalesay:latest",
                                command: ["cowsay"],
                                args: ['hello', spec!.name!]
                            }],
                            restartPolicy: "Never"
                        }
                    }
                }
            }
        }
    })
}

expandSimpleJob.usage = `
Generates CronJob from the 'SimpleJob' custom resource.
Configured using a custom resource of kind SimpleJob, e.g.:
apiVersion: batch.hideto0710.github.com/v1
kind: SimpleJob
metadata:
  name: sample
spec:
  schedule: "*/1 * * * *"
  name: hideto0710
This configuration creates CronJob.
`;
