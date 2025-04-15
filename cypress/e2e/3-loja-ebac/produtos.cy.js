/// <reference types="cypress"/>

import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        produtosPage.visitarUrl()

    });

    it('Deve selecionar um produto da lista', () => {
        produtosPage.buscarProdutoLista('Aero Daily Fitness Tee')
        cy.get('#tab-title-description > a').should('contain', 'Descrição')
    });
    
    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Argus All-Weather Tank'
        produtosPage.buscarProduto(produto)
        cy.get('#tab-title-description > a').should('contain', 'Descrição')
        
    });

    it('Deve visitar a página do produto', () => {
        produtosPage.visitarProduto('apollo running short')
        cy.get('#tab-title-description > a').should('contain', 'Descrição')
    });

    it('Deve adicionar produto ao carrinho', () => {
        let qtd = 8
        produtosPage.visitarProduto('Frankie Sweatshirt')
        produtosPage.addProdutoCarrinho('M', 'White', qtd)
        cy.get('.woocommerce-message').should('contain', 'no seu carrinho.')
    });

    it('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
            produtosPage.visitarProduto(dados[0].nomeProduto)
            produtosPage.addProdutoCarrinho(
                dados[0].tamanho, 
                dados[0].cor, 
                dados[0].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto)
        })

        
    });

});