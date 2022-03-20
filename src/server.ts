import { fastify } from 'fastify';
import autoload from 'fastify-autoload';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const start = () => {
    const app = fastify({
        logger: {
            prettyPrint: {
                translateTime: 'HH:MM:ss',
                ignore: 'pid',
            },
        },
        genReqId: () => {
            return uuidv4()
        }
    });

    app.register(autoload, {
        dir: join(__dirname, './plugins'),
    });

    app.register(autoload, {
        dir: join(__dirname, './routes'),
        options: { prefix: '/api/' },
    });

    app.listen(3000, '0.0.0.0', (err) => {
        if (err) {
            app.log.error(err);
            process.exit(1);
        }
    });

    app.ready(() => {
        app.log.info('Registered routes\n' + app.printRoutes());
        app.log.info('Registered plugins');
    });
};

start();
