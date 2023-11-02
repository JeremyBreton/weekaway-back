-- SQLBook: Code

BEGIN;

INSERT INTO "user" (firstname, lastname, email, address, password, birth_date, gender, profile_picture, profile_desc)
VALUES
    ('Marie', 'Lefort', 'marie.lefort@example.com', '333 Rue des Arbres, Ville', 'motdepasse10', '1995-02-08 10:30:00', 'Femme', 'http://exemple.com/photo_marie.jpg', 'Description de Marie Lefort.'),
    ('Thomas', 'Gagnon', 'thomas.gagnon@example.com', '777 Avenue du Soleil, Ville', 'supersecret10', '1994-12-15 16:45:00', 'Homme', 'http://exemple.com/photo_thomas.jpg', 'Description de Thomas Gagnon.'),
    ('Léa', 'Moreau', 'lea.moreau@example.com', '444 Rue du Lac, Ville', 'motdepasse11', '1993-07-18 14:20:00', 'Femme', 'http://exemple.com/photo_lea.jpg', 'Description de Léa Moreau.'),
    ('Antoine', 'Roy', 'antoine.roy@example.com', '999 Boulevard des Montagnes, Ville', 'secret11', '1996-03-25 09:15:00', 'Homme', 'http://exemple.com/photo_antoine.jpg', 'Description d''Antoine Roy.'),
    ('Camille', 'Girard', 'camille.girard@example.com', '555 Avenue des Roses, Ville', 'motdepasse12', '1997-06-30 13:00:00', 'Femme', 'http://exemple.com/photo_camille.jpg', 'Description de Camille Girard.'),
    ('Gabriel', 'Bouchard', 'gabriel.bouchard@example.com', '111 Rue de la Mer, Ville', 'supersecret12', '1998-08-12 11:10:00', 'Homme', 'http://exemple.com/photo_gabriel.jpg', 'Description de Gabriel Bouchard.'),
    ('Mélanie', 'Bergeron', 'melanie.bergeron@example.com', '666 Rue des Champs, Ville', 'motdepasse13', '1999-04-05 08:00:00', 'Femme', 'http://exemple.com/photo_melanie.jpg', 'Description de Mélanie Bergeron.'),
    ('Lucas', 'Lavoie', 'lucas.lavoie@example.com', '888 Avenue des Étoiles, Ville', 'secret13', '2000-01-20 17:25:00', 'Homme', 'http://exemple.com/photo_lucas.jpg', 'Description de Lucas Lavoie.'),
    ('Charlotte', 'Lemieux', 'charlotte.lemieux@example.com', '777 Boulevard du Parc, Ville', 'motdepasse14', '2001-09-10 12:30:00', 'Femme', 'http://exemple.com/photo_charlotte.jpg', 'Description de Charlotte Lemieux.'),
    ('Maxime', 'Caron', 'maxime.caron@example.com', '444 Rue de la Rivière, Ville', 'supersecret14', '2002-11-05 10:15:00', 'Homme', 'http://exemple.com/photo_maxime.jpg', 'Description de Maxime Caron.'),
    ('John', 'Doe', 'john.doe@example.com', '123 Rue de la République, Ville', 'motdepasse123', '1990-01-15 12:00:00', 'Homme', 'http://exemple.com/photo_profil.jpg', 'Description de John Doe.'),
    ('Alice', 'Dupont', 'alice.dupont@example.com', '456 Avenue des Fleurs, Ville', 'secret123', '1989-05-20 09:30:00', 'Femme', 'http://exemple.com/photo_alice.jpg', 'Description d''Alice Dupont.'),
    ('Éric', 'Lefebvre', 'eric.lefebvre@example.com', '789 Boulevard des Étoiles, Ville', 'motdepasse456', '1992-11-10 15:15:00', 'Homme', 'http://exemple.com/photo_eric.jpg', 'Description d''Éric Lefebvre.'),
    ('Sophie', 'Martin', 'sophie.martin@example.com', '1010 Rue de la Plage, Ville', 'supersecret', '1988-03-05 08:45:00', 'Femme', 'http://exemple.com/photo_sophie.jpg', 'Description de Sophie Martin.'),
    ('Pierre', 'Dubois', 'pierre.dubois@example.com', '222 Rue des Montagnes, Ville', 'motdepasse789', '1991-07-25 14:00:00', 'Homme', 'http://exemple.com/photo_pierre.jpg', 'Description de Pierre Dubois.');

INSERT INTO event (name, owner_id, status, description, picture, password)
VALUES
    ('Conférence Tech 2023', 1, true, 'Conférence annuelle sur la technologie', 'image1.jpg', 'motdepasse1'),
    ('Festival de Musique', 3, true, 'Festival de musique de trois jours', 'image2.jpg', 'motdepasse2'),
    ('Gala de Bienfaisance', 2, false, 'Gala de collecte de fonds pour une bonne cause', 'image3.jpg', 'motdepasse3'),
    ('Lancement de Produit', 1, true, 'Événement de lancement de notre nouveau produit', 'image4.jpg', 'motdepasse4'),
    ('Atelier Communautaire', 4, true, 'Atelier pratique pour les amateurs de bricolage', 'image5.jpg', 'motdepasse5'),
    ('Exposition d''Art', 5, true, 'Mise en avant des artistes locaux', 'image6.jpg', 'motdepasse6'),
    ('Séminaire Éducatif', 2, true, 'Séminaire éducatif sur les nouvelles tendances', 'image7.jpg', 'motdepasse7'),
    ('Tournoi de Sport', 3, false, 'Tournoi de sports inter-entreprises', 'image8.jpg', 'motdepasse8'),
    ('Forum des Entrepreneurs', 1, true, 'Forum annuel pour les entrepreneurs', 'image9.jpg', 'motdepasse9'),
    ('Salon du Livre', 4, true, 'Rencontre des auteurs et dédicaces', 'image10.jpg', 'motdepasse10'),
    ('Exposition Technologique', 3, false, 'Exposition des dernières innovations technologiques', 'image11.jpg', 'motdepasse11'),
    ('Foire aux Métiers', 2, true, 'Foire pour explorer différentes carrières', 'image12.jpg', 'motdepasse12'),
    ('Ciné-Club', 5, true, 'Projection de films indépendants', 'image13.jpg', 'motdepasse13'),
    ('Conférence Médicale', 4, false, 'Conférence sur les avancées médicales', 'image14.jpg', 'motdepasse14'),
    ('Festival de Cuisine', 1, true, 'Célébration de la gastronomie locale', 'image15.jpg', 'motdepasse15'),
    ('Salon de la Mode', 3, true, 'Présentation des dernières tendances de la mode', 'image16.jpg', 'motdepasse16'),
    ('Salon de l''Automobile', 2, false, 'Présentation des nouveaux modèles de voitures', 'image17.jpg', 'motdepasse17'),
    ('Festival du Film', 5, true, 'Projection de films internationaux', 'image18.jpg', 'motdepasse18'),
    ('Conférence Environnementale', 4, true, 'Débat sur les questions environnementales', 'image19.jpg', 'motdepasse19'),
    ('Salon de l''Éducation', 1, false, 'Exposition des institutions éducatives', 'image20.jpg', 'motdepasse20');



    INSERT INTO userchoice (start_date_choice, end_date_choice, user_id, event_id)
VALUES
    ('2023-11-01 10:00:00', '2023-11-01 16:00:00', 1, 1),
    ('2023-11-05 15:00:00', '2023-11-05 17:30:00', 2, 2),
    ('2023-11-10 11:30:00', '2023-11-10 16:00:00', 3, 1),
    ('2023-11-15 12:15:00', '2023-11-15 15:30:00', 4, 3),
    ('2023-11-20 14:00:00', '2023-11-20 18:30:00', 5, 2),
    ('2023-11-25 09:30:00', '2023-11-25 17:00:00', 6, 4),
    ('2023-11-30 12:45:00', '2023-11-30 19:00:00', 7, 3),
    ('2023-12-05 10:30:00', '2023-12-05 18:00:00', 8, 5),
    ('2023-12-10 12:00:00', '2023-12-10 16:45:00', 9, 4),
    ('2023-12-15 11:15:00', '2023-12-15 15:30:00', 10, 6),
    ('2023-12-20 14:30:00', '2023-12-20 17:30:00', 1, 5),
    ('2023-12-25 15:45:00', '2023-12-25 20:00:00', 2, 7),
    ('2023-12-30 10:15:00', '2023-12-30 16:30:00', 3, 6),
    ('2024-01-05 11:30:00', '2024-01-05 18:30:00', 4, 8),
    ('2024-01-10 12:45:00', '2024-01-10 16:15:00', 5, 7),
    ('2024-01-15 10:00:00', '2024-01-15 17:00:00', 6, 9),
    ('2024-01-20 14:15:00', '2024-01-20 17:45:00', 7, 8),
    ('2024-01-25 13:30:00', '2024-01-25 16:30:00', 8, 10),
    ('2024-01-30 11:00:00', '2024-01-30 19:00:00', 9, 9),
    ('2024-02-05 09:45:00', '2024-02-05 17:30:00', 10, 11);

    INSERT INTO user_has_event (user_id, event_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 1),
    (4, 3),
    (5, 2),
    (6, 4),
    (7, 3),
    (8, 5),
    (9, 4),
    (10, 6),
    (1, 5),
    (2, 7),
    (3, 6),
    (4, 8),
    (5, 7),
    (6, 9),
    (7, 8),
    (8, 10),
    (9, 9),
    (10, 11);

-- Ajout de 20 dates pour des événements
INSERT INTO eventdate (start_date, end_date, event_id)
VALUES
    ('2023-11-01 09:00:00', '2023-11-01 17:00:00', 1),
    ('2023-11-05 14:30:00', '2023-11-05 18:00:00', 2),
    ('2023-11-10 10:00:00', '2023-11-10 16:30:00', 1),
    ('2023-11-15 11:45:00', '2023-11-15 16:15:00', 3),
    ('2023-11-20 13:00:00', '2023-11-20 19:30:00', 2),
    ('2023-11-25 08:30:00', '2023-11-25 16:00:00', 4),
    ('2023-11-30 12:00:00', '2023-11-30 20:00:00', 3),
    ('2023-12-05 09:30:00', '2023-12-05 18:45:00', 5),
    ('2023-12-10 11:15:00', '2023-12-10 17:30:00', 4),
    ('2023-12-15 10:00:00', '2023-12-15 16:00:00', 6),
    ('2023-12-20 13:30:00', '2023-12-20 18:30:00', 5),
    ('2023-12-25 14:15:00', '2023-12-25 21:00:00', 7),
    ('2023-12-30 10:30:00', '2023-12-30 17:45:00', 6),
    ('2024-01-05 11:00:00', '2024-01-05 19:00:00', 8),
    ('2024-01-10 09:45:00', '2024-01-10 15:30:00', 7),
    ('2024-01-15 12:30:00', '2024-01-15 18:15:00', 9),
    ('2024-01-20 13:15:00', '2024-01-20 17:45:00', 8),
    ('2024-01-25 10:00:00', '2024-01-25 16:30:00', 10),
    ('2024-01-30 11:45:00', '2024-01-30 20:00:00', 9),
    ('2024-02-05 08:30:00', '2024-02-05 15:45:00', 11);

COMMIT;
