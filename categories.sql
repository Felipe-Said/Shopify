-- Criar 80 categorias filhas uma a uma
INSERT INTO category (status, include_in_nav, position, parent_id) VALUES (true, true, 1, 4) RETURNING category_id;
