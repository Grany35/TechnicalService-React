
export const fetchServices = async (pageNumber, query,isActive ) => {
    const result = await fetch(`http://localhost:5049/api/ServiceInformations?pageNumber=${pageNumber}&query=${query}&isActive=${isActive}`);
    return result.json();

    // const deneme=headers.pagination;
    // console.log("deneme",JSON.parse(deneme))
};

