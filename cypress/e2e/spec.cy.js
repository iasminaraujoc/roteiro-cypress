describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  it('Completa tarefas cadastradas', () => {
    cy.visit('http://127.0.0.1:7001');
    
    cy.get('.new-todo')
     .type('TP2 de ES{enter}');

    cy.get('.todo-list li .toggle')
     .first()
     .click();

    cy.get('.toggle-all')
     .click(); 

    cy.contains('Clear completed').click();
    cy.get('.todo-list li')
      .should('have.length', 0);
  
});

  it('Marcar todas as tarefas como ativas', ()=>{
    cy.visit('http://127.0.0.1:7001');
    
    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

      cy.get('.toggle-all')
      .click();

      cy.get('.toggle-all')
      .click();

      cy.contains('Active').click();
      cy.get('.todo-list li')
        .should('have.length', 2)
        .first()
        .should('have.text', 'TP2 de ES');
  }
  );

  it('Editar tarefas', ()=>{
    cy.visit('http://127.0.0.1:7001');
    
    cy.get('.new-todo')
     .type('TP2 de ES{enter}')
     .type('Prova de ES{enter}');

    cy.get('.todo-list li')
     .first()
     .find('label')
     .dblclick();
    
     cy.get('.edit')
     .clear()
     .type('TP2 de Engenharia de Software{enter}');
    
     cy.get('.todo-list li')
     .first()
     .should('have.text', 'TP2 de Engenharia de Software');

     cy.get('.todo-list li')
     .first()
     .find('label')
     .dblclick();
    
     cy.get('.edit')
     .clear()
     .type('Prova de Engenharia de Software{enter}');
    
     cy.get('.todo-list li')
     .first()
     .should('have.text', 'Prova de Engenharia de Software');
  });
});