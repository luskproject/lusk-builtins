/*
    Lusk, a modular plugin-based project manager.
    Open-Source, MIT License

    Lusk Builtins, Built-in Transits that serve
    basic operations for Lusk.

    Copyright (C) 2024 Botaro Shinomiya <nothing@citri.one>
    Copyright (C) 2024 OSCILLIX <oscillixonline@gmail.com>
    Copyright (C) 2024 Bluskript <bluskript@gmail.com>
    Copyright (C) 2024 N1kO23 <niko.huuskonen.00@gmail.com>

    Given copyright notes are for exclusive rights to go
    beyond the license's limits. For more information, please
    check https://github.com/luskproject/lusk-builtins/
*/

const { execSync } = require( 'node:child_process' );

function swallow ( ...args ) {
    try {
        return this.call( this, ...args );
    } catch (error) {
        return error;
    }
}

module.exports = {
    id: 'os.shell',
    info: 'Runs shell commands.',
    options: {
        cmdlines: [ 'echo Hello World' ],
        envExtras: {},
        silent: false,
        skippable: false
    },
    async action ( document, path ) {
        const con = Terminal.log( `Performing ${ colors.fg.cyan( document.action ) }` );
        for ( const cmd of document.cmdlines ) {
            con.next.log( cmd );
            const output = execSync.swallow(
                cmd,
                {
                    shell: true,
                    stdio: document.silent ? "pipe" : [ 0, 0, 0 ],
                    env: {
                        ...process.env,
                        LUSK_DOCPATH: path,
                        LUSK_SKIPPABLE: document.skippable,
                        LUSK_PROJECT_NAME: this.package?.name || 'unknown',
                        ...document.envExtras
                    }
                }
            );
            if ( output instanceof Error ) {
                const optCode = ( output?.code || 'NULL' );
                if ( document.skippable ) {
                    csn.warn( 'Execution resulted in code ' + optCode + '. Skipping.' );
                } else {
                    csn.error( 'Execution resulted in code ' + optCode + '. Aborting.' );
                    process.exit( output.code || 99 );
                }
            }
        }
        con.end.log( 'All done!' );
    }
}
