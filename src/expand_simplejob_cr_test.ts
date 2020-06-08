import { Configs, TestRunner } from 'kpt-functions';
import { expandSimpleJob } from './expand_simplejob_cr';
import { SimpleJob } from "./gen/com.github.hideto0710.batch.v1";
import { CronJob } from "./gen/io.k8s.api.batch.v1beta1";


const RUNNER = new TestRunner(expandSimpleJob);

describe(expandSimpleJob.name, () => {
    it('does nothing to empty repos', RUNNER.assertCallback(new Configs([]), new Configs([])));

    it('expands SimpleJob to CronJob', async () => {
        const schedule = "*/1 * * * *";
        const name = "hideto0710";
        const input = new Configs([new SimpleJob({
            metadata: {
                name: "sample"
            },
            spec: {
                schedule,
                name
            }
        })]);
        const expectedOutput = new Configs([new CronJob({
            metadata: {
                name: "sample"
            },
            spec: {
                schedule,
                jobTemplate: {
                    spec: {
                        template: {
                            spec: {
                                containers: [{
                                    name: "hello",
                                    image: "docker/whalesay:latest",
                                    command: ["cowsay"],
                                    args: ["hello", name]
                                }]
                            }
                        }
                    }
                }
            }
        })]);
        await RUNNER.assert(input, expectedOutput);
    });
});
