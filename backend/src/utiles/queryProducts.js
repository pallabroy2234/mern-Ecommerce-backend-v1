class queryProducts {
    products = []
    query = {}
    
    constructor(products, query) {
        this.products = products;
        this.query = query;
    }
    
    // ! CATEGORY QUERY
    categoryQuery = () => {
        this.products = this.query.category.toLowerCase() ? this.products.filter(product => product.category.toLowerCase() === this.query.category.toLowerCase()) : this.products
        return this;
        
    }
    
    // ! RATTING QUERY
    
    // 4 <= 4.9 < 4 + 1
    rattingQuery = () => {
        this.products = parseInt(this.query.ratting) ? this.products.filter(product => parseInt(this.query.ratting) <= parseInt(product.ratting) && parseInt(product.ratting) < parseInt(this.query.ratting) + 1) : this.products
        return this;
    }
    
    // ! PRICE RANGE QUERY
    priceRangeQuery = ()=> {
        this.products = this.products.filter(product => product.price >= parseInt(this.query.lowPrice) && product.price <= parseInt(this.query.highPrice))
        return this;
    }
    
    
    // ! SORT PRICE QUERY
    
    sortByPrice = ()=> {
        if (this.query.sortPrice){
            if (this.query.sortPrice === "low"){
                this.products = this.products.sort((a,b)=> parseInt(a.price) - parseInt(b.price))
            }else if (this.query.sortPrice === "high"){
                this.products = this.products.sort((a,b)=> parseInt(b.price) - parseInt(a.price))
            }
        }
        return this;
    }
    
    
    
    // ! Skip Query
    
    skipQuery = ()=> {
        let {pageNumber, parPage} = this.query
        const skipPage = (parseInt(pageNumber) - 1) * parseInt(parPage)
        let skipProducts = []
        for (let i = skipPage; i < skipPage + parseInt(parPage); i++){
               if (this.products[i]){
                    skipProducts.push(this.products[i])
                }
        }
        this.products = skipProducts
        return this;
    }
    
    // ! Limit Product
    limit = ()=> {
        let temp = []
        if (this.products.length > parseInt(this.query.parPage)){
            for (let i = 0; i < parseInt(this.query.parPage); i++){
                temp.push(this.products[i])
            }
        }else {
            temp = this.products
        }
        this.products = temp
        return this;
    }
    
    countProducts = ()=> {
        this.products = this.products.length
        return this;
    }
    
    
    getProducts = () => {
        return this.products
    }
    
    
}


module.exports = queryProducts;