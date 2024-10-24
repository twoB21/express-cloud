var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // check login or not 
  let authented = req.session.authented;
  let table = `<table border="1">
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>CRUD</th>
                  </tr>
                  <tr> <form action="" method=POST>
                    <td><input type="text" name = "id"></td>
                    <td><input type="text" name = "product"></td>
                    <td><input type="submit" name="btn" value="Add"></td>
                    </form>
                  </tr>
                  <tr><form action="" method="POST">
                    <td><input type="text" name="id" value="1"></td>
                    <td><input type="text" name="product" value="car"></td>
                    <td><input type="submit" name="btn" value="Update">
                        <input type="submit" name="btn" value="Delete"></td>
                    </form>
                  </tr>
                </table>`;
  if (authented) {
    res.render('users', { title: 'Users page', products_table: table });
  } else {
    res.redirect('/login');
  }
});
/* POST users CRUD. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  res.redirect("/users");
});
module.exports = router;
