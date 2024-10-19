let hamburgueres = [
    { id: 0, name: 'X-Burguer', img: 'imagens/hamburguer.png', price: 8.00, description: 'Pão, Hamburguer, Queijo.', type: 'Hamburguer' },
    { id: 1, name: 'X-Salada', img: 'imagens/hamburguer.png', price: 9.00, description: 'Pão, Hamburguer, Queijo, Tomate e Alface.', type: 'Hamburguer' },
    { id: 2, name: 'X-Egg', img: 'imagens/hamburguer.png', price: 10.00, description: 'Pão, Hamburguer, Queijo, Ovo, Tomate e Alface.', type: 'Hamburguer' },
    { id: 3, name: 'X-Calabresa', img: 'imagens/hamburguer.png', price: 12.00, description: 'Pão, Hamburguer, Queijo, Calabresa, Tomate e Alface.', type: 'Hamburguer' },
    { id: 4, name: 'X-Bacon', img: 'imagens/hamburguer.png', price: 14.00, description: 'Pão, Hamburguer, Queijo, Bacon, Tomate e Alface.', type: 'Hamburguer' },
    { id: 5, name: 'X-Tudo', img: 'imagens/hamburguer.png', price: 18.00, description: 'Pão, Hamburguer, Queijo, Calabresa, Omelete de Presunto e Queijo, Bacon, Tomate e Alface.', type: 'Hamburguer' },
    { id: 6, name: 'X-Especial', img: 'imagens/hamburguer.png', price: 23.00, description: 'Pão, 2 Hamburgueres, Queijo, Calabresa, Omelete de Presunto e Queijo, Bacon, Tomate e Alface.', type: 'Hamburguer' }
];


let sorvetes = [
    { id: 0, name: 'Massa 200ML', img: 'imagens/sorvete.png', price: 4.00, description: '200ML', type: 'Sorvete' },
    { id: 1, name: 'Massa 300ML', img: 'imagens/sorvete.png', price: 6.00, description: '300ML', type: 'Sorvete' },
    { id: 2, name: 'Massa 400ML', img: 'imagens/sorvete.png', price: 8.00, description: '400ML', type: 'Sorvete' },
    { id: 3, name: 'Massa 500ML', img: 'imagens/sorvete.png', price: 10.00, description: '500ML', type: 'Sorvete' },
    { id: 4, name: 'Açaí 200ML', img: 'imagens/sorvete.png', price: 6.00, description: '200ML', type: 'Sorvete' },
    { id: 5, name: 'Açaí 300ML', img: 'imagens/sorvete.png', price: 8.00, description: '300ML', type: 'Sorvete' },
    { id: 6, name: 'Açaí 400ML', img: 'imagens/sorvete.png', price: 10.00, description: '400ML', type: 'Sorvete' },
    { id: 7, name: 'Açaí 500ML', img: 'imagens/sorvete.png', price: 13.00, description: '500ML', type: 'Sorvete' },
    { id: 8, name: 'Cupuaçu 200ML', img: 'imagens/sorvete.png', price: 6.00, description: '200ML', type: 'Sorvete' },
    { id: 9, name: 'Cupuaçu 300ML', img: 'imagens/sorvete.png', price: 8.00, description: '300ML', type: 'Sorvete' },
    { id: 10, name: 'Cupuaçu 400ML', img: 'imagens/sorvete.png', price: 10.00, description: '400ML', type: 'Sorvete' },
    { id: 11, name: 'Cupuaçu 500ML', img: 'imagens/sorvete.png', price: 13.00, description: '500ML', type: 'Sorvete' }
];

let pasteis = [
    { id: 0, name: 'Carne', img: 'imagens/pastel.png', price: 5.00, description: '', type: 'Pastel' },
    { id: 1, name: 'Queijo', img: 'imagens/pastel.png', price: 5.00, description: '', type: 'Pastel' },
    { id: 2, name: 'Calabresa', img: 'imagens/pastel.png', price: 5.00, description: '', type: 'Pastel' },
    { id: 3, name: 'Frango', img: 'imagens/pastel.png', price: 5.00, description: '', type: 'Pastel' },
    { id: 4, name: 'Pizza', img: 'imagens/pastel.png', price: 7.00, description: '', type: 'Pastel' },
    { id: 5, name: 'Presunto C/ Queijo', img: 'imagens/pastel.png', price: 7.00, description: '', type: 'Pastel' },
    { id: 6, name: 'Calabresa C/ Queijo', img: 'imagens/pastel.png', price: 7.00, description: '', type: 'Pastel' },
    { id: 7, name: 'Carne C/ Queijo', img: 'imagens/pastel.png', price: 8.00, description: '', type: 'Pastel' },
    { id: 8, name: 'Frango C/ Queijo', img: 'imagens/pastel.png', price: 8.00, description: '', type: 'Pastel' },
    { id: 9, name: 'Bacon C/ Queijo', img: 'imagens/pastel.png', price: 8.00, description: '', type: 'Pastel' },
];

let pasteisEspeciais = [
    { id: 0, name: 'Queijo Burg', img: 'imagens/pastel.png', price: 9.00, description: '', type: 'Pasteis Especiais' },
    { id: 1, name: 'Carne Burg', img: 'imagens/pastel.png', price: 10.00, description: '', type: 'Pasteis Especiais' },
    { id: 2, name: 'Calabresa Burg', img: 'imagens/pastel.png', price: 10.00, description: ' ', type: 'Pasteis Especiais' },
    { id: 3, name: 'Frango Burg', img: 'imagens/pastel.png', price: 10.00, description: ' ', type: 'Pasteis Especiais' },
    { id: 4, name: 'Presunto Burg', img: 'imagens/pastel.png', price: 10.00, description: ' ', type: 'Pasteis Especiais' },
    { id: 5, name: 'Bacon Burg', img: 'imagens/pastel.png', price: 10.00, description: ' ', type: 'Pasteis Especiais' },
];

let batatas = [
    { id: 0, name: 'Batata (P)', img: 'imagens/batataFritas.png', price: 7.00, description: '', type: 'Batatas' },
    { id: 1, name: 'Batata (M)', img: 'imagens/batataFritas.png', price: 10.00, description: '', type: 'Batatas' },
    { id: 2, name: 'Batata (G)', img: 'imagens/batataFritas.png', price: 15.00, description: '', type: 'Batatas' },
];

let bebidas = [
    { id: 0, name: 'Coca Cola', img: 'imagens/cocacola200ml.png', price: 3.00, description: '200ML', type: 'Refrigerante' },
    { id: 1, name: 'Dollynho', img: 'imagens/dollynho.png', price: 3.50, description: '350ML', type: 'Refrigerante' },
    { id: 2, name: 'Dolly', img: 'imagens/dolly2l.png', price: 6.50, description: '2L', type: 'Refrigerante' },
    { id: 3, name: 'Fanta', img: 'imagens/fanta1l.png', price: 8.00, description: '1L', type: 'Refrigerante' },
    { id: 4, name: 'Coca Cola', img: 'imagens/cocacola1l.png', price: 9.00, description: '1L', type: 'Refrigerante' },
];


let salgados = [
    { id: 0, name: 'Salgados Mini (UN)', img: 'imagens/salgado.png', price: 0.50, description: 'Coxinha, Risole, Bolinho de Queijo, Bolinho de Salsicha, Bolinho de Carne', type: 'Salgados' },
    { id: 1, name: 'Cento de Salgados Mini', img: 'imagens/centosalgado.png', price: 45.00, description: 'Coxinha, Risole, Bolinho de Queijo, Bolinho de Salsicha, Bolinho de Carne', type: 'Salgados' }
];