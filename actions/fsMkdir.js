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

const { Colors, Terminal, Errors } = require( 'lusk:internal' );
const { join, isAbsolute } = require( 'node:path' );
const { mkdirSync } = require( 'node:fs' );
const { isParentOrSamePath } = require( '../utils/pathUtils' );

module.exports = {
    id: 'fs.mkdir',
    info: 'Creates a directory.',
    options: {
        destination: 'build/release',
        recursive: true,
        skippable: false
    },
    async action ( document, path, homedir, solution ) {
        Terminal.log( `Performing ${ Colors.fg.cyan( document.action ) } on path ${ Colors.fg.yellow( document.destination ) }` );

        // Get the real destination
        const destination = isAbsolute( document.destination ) ? document.destination : join( path, document.destination );

        // After getting the real destination, check if the
        // solution exists and if so, make sure that
        // our destination path exists in the included files.
        if ( solution && !solution.included.some( solPath => isParentOrSamePath( solPath, destination ) ) )
            throw new Errors.SourceNotInSolutionError( `Given destination path "${ destination }" is not included in the included files in the solution` );

        // We can now do our thing hehe :p
        try {
            mkdirSync( destination, { recursive: true } );
        } catch ( e ) {
            if ( !document.skippable )
                throw e;
        }
    }
}
