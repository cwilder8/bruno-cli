const {Command, flags} = require('@oclif/command')
fs = require('fs')

class ConfigCommand extends Command {
  

  async run() {
    const {flags} = this.parse(ConfigCommand)
    if(!flags.edit && !flags.name) {

      const {args} = this.parse(ConfigCommand)
      var body = JSON.parse(fs.readFileSync('config.json').toString());
      if(body[args.arg1] == null){
        this.log('Configuration setting ' + args.arg1 + ' not found\n')
        return
      }
      else{
        body[args.arg1] = args.arg2
      }
      fs.writeFileSync('config.json', JSON.stringify(body));
    }
    else if(flags.name){
      const name = flags.name || 'world'
      this.log(`hello ${name} from /config`)
    }
  }


}

ConfigCommand.description = `Alter configuration of Bruno
...
Extra documentation goes here
`

ConfigCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
  edit: flags.string({char: 'e', description: 'edit config file'})
}

ConfigCommand.args = [
  {name: 'arg1', required: true},
  {name: 'arg2', required: true}
]

// ConfigCommand.arguments = [
//   {name: 'arg1', required: true},
//   {name: 'arg2', required: true},
// ]

module.exports = ConfigCommand