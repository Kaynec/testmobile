import { studentInstance as instance } from './student-api-client';
class product {
  async getCategory(id: string) {
    return instance.get(`product-category/${id}`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async getAllCategories() {
    return instance.get(`product-category`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async getCategoryPicture(id: string) {
    return instance.get(`/product-category/coverImage/${id}`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        // 'Content-Type': 'application/json'
      }
    });
  }
  async getProduct(id: string) {
    return instance.get(`product/${id}`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async getAllProducts(id) {
    return instance.get(`/product/getbycategory/${id}`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async getProductPicture(id: string) {
    return instance.get(`/product/coverImage/${id}`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        // 'Content-Type': 'application/json'
      }
    });
  }
  // async update(id: string, course: any) {
  //   return instance.put(`product-category/${id}`, course, {
  //     headers: {
  //       // Overwrite Axios's automatically set Content-Type
  //       'Content-Type': 'application/json'
  //     }
  //   });
  // }
  // async delete(id: string) {
  //   return instance.delete(`product-category/${id}`, {
  //     headers: {
  //       // Overwrite Axios's automatically set Content-Type
  //       'Content-Type': 'application/json'
  //     }
  //   });
  // }

  // async create(course: any) {
  //   return instance.post(`product-category`, course, {
  //     headers: {
  //       // Overwrite Axios's automatically set Content-Type
  //       'Content-Type': 'application/json'
  //     }
  //   });
  // }
}

export const StudentproductApi = new product();
