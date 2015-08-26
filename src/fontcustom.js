import async from 'async';
import ccase from 'change-case';

function cli(options) {
    let result = [];

    for (let key of Object.keys(options)) {
        let value = options[key];

        if (value === null || value === void 0) {
            continue;
        }

        if (value instanceof Array) {
            value = value.join(' ');
        }

        result.push('--' + ccase.param(key) + '=' + value);
    }

    return result;
}

export default grunt => {
    grunt.registerMultiTask('fontcustom', "Compile a folder of SVG files into a font using FontCustom", function () {
        // FontCustom options and default values
        // each camelCaseKey: value pair is converted to CLI options as --camel-case-key=value
        let options = cli(this.options({
            config: null,
            templates: null,
            fontName: this.target,
            fontDesignSize: 16,
            fontEm: 512,
            fontAscent: 448,
            fontDescent: 64,
            cssSelector: '.icon-{{glyph}}',
            preprocessorPath: null
        }));

        // spawn task for each src/dest pair in series
        async.eachSeries(this.files, (file, next) => {
            grunt.util.spawn({
                cmd: 'fontcustom',
                args: [ 'compile', file.src[ 0 ], '--output', file.dest, ...options ]
            }, next);
        }, this.async());
    });
};
