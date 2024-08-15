import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductModal = ({ setShowModal, addProduct }) => {
    const [brands, setBrands] = useState([]);
    const [prices, setPrices] = useState([]);
    const [variants, setVariants] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedVariant, setSelectedVariant] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [sellingPrice, setSellingPrice] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Fetch brands from backend
        fetchBrands();
    }, []);

    useEffect(() => {
        // Calculate total amount whenever quantity or selling price changes
        setTotalPrice(quantity * sellingPrice);
    }, [quantity, sellingPrice]);

    const fetchBrands = () => {
        axios.get('http://localhost:8080/api/products/brands')
            .then(response => setBrands(response.data))
            .catch(error => console.error('Error fetching brands:', error));
    };

    const handleBrandChange = (e) => {
        console.log(e.target.value);
        const brandId = e.target.value;
        setSelectedBrand(brandId);
        setSelectedPrice('');
        setSelectedVariant('');
        setPrices([]);
        setVariants([]);
        if (brandId) {
            // Fetch prices for the selected brand
            axios.get(`http://localhost:8080/api/products/prices?brandId=${brandId}`)
                .then(response => setPrices(response.data))
                .catch(error => console.error('Error fetching prices:', error));
        }
    };

    const handlePriceChange = (e) => {
        const priceId = e.target.value;
        setSelectedPrice(priceId);
        setSelectedVariant('');
        setVariants([]);
        if (priceId) {
            // Fetch variants for the selected price
            axios.get(`http://localhost:8080/api/products/variants?priceId=${priceId}`)
                .then(response => setVariants(response.data))
                .catch(error => console.error('Error fetching variants:', error));
        }
    };

    const handleAddProduct = () => {
        const selectedProduct = variants.find(variant => variant.id === Number(selectedVariant));        
        const product = {
            variantId: Number(selectedVariant),
            brandName: brands.find(brand => brand.id === Number(selectedBrand)).name,
            price: prices.find(price => price.id === Number(selectedPrice)).price,
            description: selectedProduct.description,
            quantity,
            sellingPrice: parseFloat(sellingPrice),
            totalPrice: parseFloat(totalPrice),
        };
        // console.log(product);
        addProduct(product);
        setShowModal(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add Product</h2>
                <div className="form-group">
                    <label>Brand</label>
                    <select value={selectedBrand} onChange={handleBrandChange} required>
                        <option value="">Select Brand</option>
                        {brands.map(brand => (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <select value={selectedPrice} onChange={handlePriceChange} required>
                        <option value="">Select Price</option>
                        {prices.map(price => (
                            <option key={price.id} value={price.id}>{price.price}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Variant</label>
                    <select value={selectedVariant} onChange={(e) => setSelectedVariant(e.target.value)} required>
                        <option value="">Select Variant</option>
                        {variants.map(variant => (
                            <option key={variant.id} value={variant.id}>{variant.description}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        min="1"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Selling Price</label>
                    <input
                        type="number"
                        step="0.01"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Total Amount</label>
                    <input type="number" value={totalPrice.toFixed(2)} readOnly />
                </div>
                <button onClick={handleAddProduct}>Add Product</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
        </div>
    );
};

export default ProductModal;
