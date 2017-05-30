import {BootScript} from "@mean-expert/boot-script";

@BootScript()
class Script {
  constructor(app: any) {

    let user = app.models.Person;
    let Role = app.models.Role;
    let RoleMapping = app.models.RoleMapping;

    user.create([
        {
          username: 'admin',
          email: 'gramasewakasys@gmail.com',
          password: 'admin',
          userRole: 'admin',
          emailVerified: true
        }
      ],

      (err: any, user: any) => {
        if (err) return console.log(err);

        //create the admin role
        Role.create([{
          name: 'admin'
        }, {
          name: 'gs',
        },{
          name: 'gm'
        }], (err: any, roles: any) => {
          if (err) return console.log(err);

          console.log(user[0].id);

          //make bob an admin
          roles[0].principals.create({
            principalType: RoleMapping.USER,
            principalId: user[0].id
          }, (err: any, principal: any) => {
            if (err) return console.log(err);
          });
        });
      }
    )

  }
}

module.exports = Script;
