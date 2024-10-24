const pool = require("../models/pg_connector");

async function display_shopuser_page(req, res) {
    if (req.session.authented && req.session.role_id === 3) { // Check if shop user is logged in
        const shop_id = req.session.shop_id; // Retrieve shop_id from the session

        try {
            // Query the products related to the shop_id
            const result = await pool.query('SELECT id, product_name, amount, price FROM products WHERE shop_id = $1', [shop_id]);
            
            // Generate the product table
            let table = generate_product_table(result.rows);

            // Render the shopusers view and pass the table to the template
            res.render('shopusers', { title: 'Shop Products', products_table: table });

        } catch (err) {
            console.error('Database query error:', err);
            res.status(500).send('Error retrieving products data. Please try again later.');
        }
    } else {
        res.redirect('/login'); // Redirect to login if not authenticated
    }
}

// Function to generate product table
function generate_product_table(products) {
    if (products.length === 0) {
        return `<table border=1>
                    <tr>
                        <td colspan="4">No products found for this shop.</td>
                    </tr>
                </table>`;
    }

    let table = `<table border=1>
        <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Amount</th>
            <th>Price</th>
        </tr>`;

    // Loop through the products and add them to the table
    products.forEach(product => {
        table += `
        <tr>
            <td>${product.id}</td>
            <td>${product.product_name}</td>
            <td>${product.amount}</td>
            <td>${product.price}</td>
        </tr>`;
    });

    table += `</table>`;
    return table;
}

module.exports = display_shopuser_page;
