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
const { readdirSync, rmSync, existsSync } = require( 'node:fs' );

module.exports = {
    id: 'fs.remove',
    info: 'Removes a file or directory.',
    options: {
        source: 'build',
        skippable: false
    },
    async action ( document, path ) {
        Terminal.log( `Performing ${ colors.fg.cyan( document.action ) } on path ${ colors.fg.yellow( document.source ) }` );

        // Get the real source
        const source = isAbsolute( document.source ) ? document.source : join( path, document.source );

        // Check if source exists.
        if ( !existsSync( source ) && !document.skippable )
            throw new Errors.SourceNotExistsError( `Given source path "${ source }" doesn't exist, aborting procedure.` );

        // Let's blow up some files :V
        try {
            rmSync( source, { recursive: true } );
        } catch ( e ) {
            if ( !document.skippable )
                throw e;
        }
    }
}
