class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  // @ Filtration Method
  filter() {
    const queryStringObj = { ...this.queryString };
    const excludesFields = ["page", "sort", "limit", "fields"];
    excludesFields.forEach((field) => delete queryStringObj[field]);
    // @ Apply filtration
    let queryStr = JSON.stringify(queryStringObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => "$" + match);
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

    return this;
  }

  // @ Sorting
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.query.sort.split(",").json(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  // @ To Select the required fields
  limitFields() {
    if (this.queryString.fields) {
      const returnedFields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(returnedFields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  // @ Searching
  search(modelName) {
    if (this.queryString.keyword) {
      const query = {};
      if (modelName === "Products") {
        query.$or = [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ];
        this.mongooseQuery = this.mongooseQuery.find(query);
      } else {
        query = { name: { $regex: this.queryString.keyword, $options: "i" } };
      }
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }

  // @ pagination
  pagination(numberOfDocs) {
    const page = this.queryString.page * 1 || 1;
    const limitOfItems = this.queryString.limit * 1 || 50;
    const skipPreviousPage = (page - 1) * limitOfItems;
    const endIndex = page * limitOfItems;

    const pageNumber = {};
    pageNumber.currentPage = page;
    pageNumber.limit = limitOfItems;
    pageNumber.numberOfPages = Math.ceil(numberOfDocs / limitOfItems);

    if (endIndex < numberOfDocs) {
      pageNumber.next = page + 1;
    }

    if (skipPreviousPage > 0) {
      pageNumber.prev = page - 1;
    }

    this.mongooseQuery = this.mongooseQuery
      .skip(skipPreviousPage)
      .limit(limitOfItems);
    this.paginationResult = pageNumber;
    return this;
  }
}

export default ApiFeatures;
