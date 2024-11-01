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
const { writeFileSync, existsSync } = require( 'node:fs' );

module.exports = {
    id: 'fs.touch',
    info: 'Creates a file.',
    options: {
        destination: 'readme.txt',
        content: '',
        trim: false,
        overwrite: false,
        skippable: false
    },
    async action ( document, path ) {
        Terminal.log( `Performing ${ colors.fg.cyan( document.action ) } on path ${ colors.fg.yellow( document.destination ) }` );

        // Get the real destination
        const destination = isAbsolute( document.destination ) ? document.destination : join( path, document.destination );

        // Check if file exists and if so, throw an error
        // depending on the availability of "skippable" option
        if ( existsSync( destination ) && document.overwrite == false ) {
            if ( document.skippable == false )
                throw new Errors.FileExistsError( `File in path "${ destination }" already exists, aborting procedure.` );
            else return;
        }

        // We can now create our file :3
        writeFileSync( destination, document.trim ? document.content.trim() : document.content );
    }
}
