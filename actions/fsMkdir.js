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

const { join, isAbsolute } = require( 'node:path' );
const { mkdirSync } = require( 'node:fs' );

module.exports = {
    id: 'fs.mkdir',
    info: 'Creates a directory.',
    options: {
        destination: 'build/release',
        recursive: true,
        skippable: false
    },
    async action ( document, path ) {
        Terminal.log( `Performing ${ colors.fg.cyan( document.action ) } on path ${ colors.fg.yellow( document.destination ) }` );

        // Get the real destination
        const destination = isAbsolute( document.destination ) ? document.destination : join( path, document.destination );

        // We can now do our thing hehe :p
        try {
            mkdirSync( destination, { recursive: true } );
        } catch ( e ) {
            if ( !document.skippable )
                throw e;
        }
    }
}
