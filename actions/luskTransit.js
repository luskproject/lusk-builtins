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

const { Colors, Terminal } = require( 'lusk:internal' );
const { join, isAbsolute } = require( 'node:path' );
const { existsSync } = require( 'node:fs' );

module.exports = {
    id: 'lusk.transit',
    info: 'Runs a Javascript Transit file.',
    options: {
        source: "transit.js",
        env: {},
        skippable: false
    },
    async action ( document, path ) {
        Terminal.log( `Performing ${ Colors.fg.cyan( document.action ) } on file ${ Colors.fg.yellow( document.source ) }` );

        // Get the real source
        const source = isAbsolute( document.source ) ? document.source : join( path, document.source );

        // Run the script
        try {
            Unit.runFile( source, { OPTIONS: document, CURRENTPATH: path, ENVIRONMENT: document.env } );
        } catch ( e ) {
            if ( !document.skippable )
                throw e;
        }
    }
}
