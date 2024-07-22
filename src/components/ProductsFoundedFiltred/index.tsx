import { usePagesManagement } from "../../contexts/PagesManagementContext";

function ProductsFoundedFiltred() {

    const { PageData } = usePagesManagement()
    console.log("page data", PageData);

    return(
        <h1>{PageData.map((pro) => {
            return(
                <h1>{pro.Marca}</h1>
            )
        })}</h1>
    )
}

export default ProductsFoundedFiltred;