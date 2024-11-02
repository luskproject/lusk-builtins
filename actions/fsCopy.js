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
const { cpSync, existsSync } = require( 'node:fs' );
const { isParentOrSamePath } = require( '../utils/pathUtils' );

module.exports = {
    id: 'fs.copy',
    info: 'Copies files or directories.',
    options: {
        source: 'src',
        destination: 'build',
        overwrite: false,
        skippable: false
    },
    async action ( document, path, homedir, solution ) {
        Terminal.log( `Performing ${ colors.fg.cyan( document.action ) } from ${ colors.fg.yellow( document.source ) } to ${ colors.fg.yellow( document.destination ) }` );

        // Get the real source and destination
        const source      = isAbsolute( document.source      ) ? document.source      : join( path, document.source      );
        const destination = isAbsolute( document.destination ) ? document.destination : join( path, document.destination );

        // After getting the real destination, check if the
        // solution exists and if so, make sure that
        // our destination path exists in the included files.
        if ( solution && !solution.included.some( solPath => isParentOrSamePath( solPath, destination ) ) )
            throw new Errors.SourceNotInSolutionError( `Given destination path "${ destination }" is not included in the included files in the solution` );

        // Check if source and destination exists. Destination
        // path can be non-existent but parent directory MUST
        // exists in order to make copy operation work.
        if ( !existsSync( source ) )
            throw new Errors.SourceNotExistsError( `Given source path "${ source }" doesn't exist, aborting procedure.` );
        if ( !existsSync( join( destination, '../' ) ) )
            throw new Errors.DestinationParentNotExistsError( `Given destination path "${ destination }" does not provide an existing parent directory, aborting procedure.` )

        // After we made sure that these paths exist, we
        // can now do our thing hehe :p
        try {
            cpSync( source, destination, { recursive: true } );
        } catch ( e ) {
            if ( !document.skippable )
                throw e;
        }
    }
}
