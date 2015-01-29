module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      bin: ['bin/tslint-cli.js'],
      core: ['build/rules/', 'build/formatters', 'lib/tslint.*'],
      test: ['build/test/'],
    },

    concat: {
      bin: {
        src: ['lib/typescriptServices.js', 'bin/tslint-cli.js'],
        dest: 'bin/tslint-cli.js'
      },
      core: {
        src: ['lib/typescriptServices.js', 'lib/tslint.js'],
        dest: 'lib/tslint.js'
      },
      test: {
        src: ['lib/typescriptServices.js', 'build/tslint-tests.js'],
        dest: 'build/tslint-tests.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['build/tslint-tests.js']
      }
    },

    tslint: {
      options: {
        configuration: grunt.file.readJSON("tslint.json")
      },
      src: [
        "src/*.ts",
        "src/formatters/**/*.ts",
        "src/language/**/*.ts",
        "src/rules/**/*.ts"
      ],
      test: [
        "test/**/*.ts",
        "!test/**/*.test.ts",
        "!test/typings/*.ts"
      ]
    },

    ts: {
      options:{
        sourceMap: false,
        target: 'es5'
      },

      bin: {
        src: ['src/tslint-cli.ts'],
        out: 'bin/tslint-cli.js'
      },

      core: {
        options: {
          declaration: true,
          module: 'commonjs'
        },
        src: ['src/tslint.ts'],
        out: 'lib/tslint.js'
      },

      core_rules: {
        options: {
          base_path: 'src/rules',
          noImplicitAny: true,
          module: 'commonjs'
        },
        src: [
          'lib/tslint.d.ts',
          'src/rules/banRule.ts',
          'src/rules/classNameRule.ts',
          'src/rules/curlyRule.ts',
          'src/rules/eoflineRule.ts',
          'src/rules/forinRule.ts',
          'src/rules/interfaceNameRule.ts',
          'src/rules/labelPositionRule.ts',
          'src/rules/labelUndefinedRule.ts',
          'src/rules/maxLineLengthRule.ts',
          'src/rules/memberOrderingRule.ts',
          'src/rules/noAnyRule.ts',
          'src/rules/noArgRule.ts',
          'src/rules/noBitwiseRule.ts',
          'src/rules/noConsoleRule.ts',
          'src/rules/noConstructorVarsRule.ts',
          'src/rules/noConstructRule.ts',
          'src/rules/noDebuggerRule.ts',
          'src/rules/noDuplicateKeyRule.ts',
          'src/rules/noDuplicateVariableRule.ts',
          'src/rules/noEvalRule.ts',
          'src/rules/noSwitchCaseFallThroughRule.ts',
          'src/rules/noTrailingCommaRule.ts',
          'src/rules/noUnreachableRule.ts',
          'src/rules/noUseBeforeDeclareRule.ts',
          'src/rules/noVarRequiresRule.ts',
          'src/rules/quotemarkRule.ts',
          'src/rules/radixRule.ts',
          'src/rules/semicolonRule.ts',
          'src/rules/tripleEqualsRule.ts',
          'src/rules/variableNameRule.ts',
          'src/rules/useStrictRule.ts'
        ],
        outDir: 'build/rules/'
      },

      core_formatters: {
        options: {
          base_path: 'src/formatters',
          noImplicitAny: true,
          module: 'commonjs'
        },
        src: ['lib/tslint.d.ts', 'src/formatters/*.ts'],
        outDir: 'build/formatters/'
      },

      test: {
        src: [
          'test/**/*.ts',

          '!test/rules/*.ts',
          'test/rules/banRuleTests.ts',
          'test/rules/classNameRuleTests.ts',
          'test/rules/curlyRuleTests.ts',
          'test/rules/eofLineRuleTests.ts',
          'test/rules/forinRuleTests.ts',
          'test/rules/interfaceNameRuleTests.ts',
          'test/rules/labelPositionRuleTests.ts',
          'test/rules/labelUndefinedRuleTests.ts',
          'test/rules/maxLineLengthRuleTests.ts',
          'test/rules/memberOrderingRuleTests.ts',
          'test/rules/noAnyRuleTests.ts',
          'test/rules/noArgRuleTests.ts',
          'test/rules/noBitwiseRuleTests.ts',
          'test/rules/noConsoleRuleTests.ts',
          'test/rules/noConstructorVarsRuleTests.ts',
          'test/rules/noConstructRuleTests.ts',
          'test/rules/noDebuggerRuleTests.ts',
          'test/rules/noDuplicateKeyRuleTests.ts',
          'test/rules/noDuplicateVariableRuleTests.ts',
          'test/rules/noEvalRuleTests.ts',
          'test/rules/noSwitchCaseFallThroughRuleTests.ts',
          'test/rules/noTrailingCommaRuleTests.ts',
          'test/rules/noUnreachableRuleTests.ts',
          'test/rules/noUseBeforeDeclareRuleTests.ts',
          'test/rules/noVarRequiresRuleTests.ts',
          'test/rules/quotemarkRuleTests.ts',
          'test/rules/radixRuleTests.ts',
          'test/rules/semicolonRuleTests.ts',
          'test/rules/tripleEqualsRuleTests.ts',
          'test/rules/variableNameRuleTests.ts',
          'test/rules/useStrictRuleTests.ts',

          '!test/files/**/*.ts'
        ],
        out: 'build/tslint-tests.js'
      }
    }
  });

  // load NPM tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-ts');

  // register custom tasks
  grunt.registerTask('core', ['clean:core', 'ts:core', 'concat:core', 'ts:core_rules', 'ts:core_formatters']);
  grunt.registerTask('bin', ['clean:bin', 'ts:bin', 'tslint:src', 'concat:bin']);
  grunt.registerTask('test', ['clean:test', 'ts:test', 'tslint:test', 'concat:test', 'mochaTest']);

  // create default task
  grunt.registerTask('default', ['core', 'bin', 'test']);
};
