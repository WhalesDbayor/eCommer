// Add to cart function (use in route)
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.id;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const cart = await Cart.findOne({ userId });
    if (cart) {
        let itemIndex = cart.items.findIndex(p => p.productId.equals(productId));
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity, price: product.price });
        }
        cart.bill += quantity * product.price;
    } else {
        const newCart = await Cart.create({
            userId,
            items: [{ productId, quantity, price: product.price }],
            bill: quantity * product.price
        });
        return res.json(newCart);
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error('Cart error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
