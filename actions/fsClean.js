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
const { readdirSync, rmSync, existsSync } = require( 'node:fs' );
const { isParentOrSamePath } = require( '../utils/pathUtils' );

module.exports = {
    id: 'fs.clean',
    info: 'Cleans a directory.',
    options: {
        source: 'build',
        skippable: false
    },
    async action ( document, path, homedir, solution ) {
        Terminal.log( `Performing ${ Colors.fg.cyan( document.action ) } on directory ${ Colors.fg.yellow( document.source ) }` );

        // Get the real source
        const source = isAbsolute( document.source ) ? document.source : join( path, document.source );

        // After getting the real source, check if the
        // solution exists and if so, make sure that
        // our source path exists in the included files.
        if ( solution && !solution.included.some( solPath => isParentOrSamePath( solPath, source ) ) )
            throw new Errors.SourceNotInSolutionError( `Given source path "${ source }" is not included in the included files in the solution` );

        // Check if source exists.
        if ( !existsSync( source ) && !document.skippable )
            throw new Errors.SourceNotExistsError( `Given source path "${ source }" doesn't exist, aborting procedure.` );

        // Let's blow up some files :V
        try {
            readdirSync( source ).forEach( file => rmSync( join( source, file ), { recursive: true } ) );
        } catch ( e ) {
            if ( !document.skippable )
                throw e;
        }
    }
}
