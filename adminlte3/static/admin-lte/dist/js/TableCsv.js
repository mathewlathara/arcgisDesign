export default class{
    /**
     * 
     * @param {HTMLTableElement} root the table element which will disply csv 
     */
    constructor(root){
        this.root = root;
    }
    /**
     * Clear all header including header...
     */
    clear(){
        this.root.innerHTML = "";
    }

    update(data, headerColumns=[]){
        this.clear();
        this.setHeader(headerColumns);
        this.setBody(data);

    }
    /**
     * 
     * @param {string[]} headerColumns the table element which will disply csv 
     */
    setHeader(headerColumns){
        this.root.insertAdjacentHTML("afterbegin", `
        <thead>
            <tr>
            ${ headerColumns.map(text => `<th>${text}</th>`).join("")}
            </tr>
        </thead>
        `);
    }

    /**
     * 
     * @param {string[]} data the table element which will disply csv 
     */
    setBody(data){
        const rowHtml = data.map(row =>{
            return `
            <tr>
                ${row.map(text => `<td>${text}</td>`).join("")}
            </tr>
            `;
        } );

        this.root.insertAdjacentHTML("beforeend", `
            <tbody>
                ${rowHtml.join("")}
            </tbody>
        `)

    }
}