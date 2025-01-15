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

const { Transit } = require( 'lusk:internal' );

Transit( {
    id: "LuskBuiltins",
    plugin ( Manager ) {
        const add = Manager.actions.add.bind( Manager.actions );

        // Filesystem Stuff
        add( require( './actions/fsTouch' ) );
        add( require( './actions/fsCopy' ) );
        add( require( './actions/fsMkdir' ) );
        add( require( './actions/fsClean' ) );
        add( require( './actions/fsRemove' ) );

        // Internal Stuff
        add( require( './actions/osShell' ) );
        add( require( './actions/luskTransit' ) );
    }
} );
