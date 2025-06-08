
CREATE TABLE adresse (
  id INT PRIMARY KEY AUTO_INCREMENT,
  rue VARCHAR(255) NOT NULL,
  ville VARCHAR(100) NOT NULL,
  departement VARCHAR(100) NOT NULL,
  pays VARCHAR(100) NOT NULL,
  code_postal VARCHAR(20) NOT NULL
);

CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  adresse_id INT NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  nom VARCHAR(100) NOT NULL,
  date_de_naissance DATE NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(255) NOT NULL,
  FOREIGN KEY (adresse_id) REFERENCES adresse(id)
);

CREATE TABLE ticket (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  nom VARCHAR(100) NOT NULL,
  contenu TEXT NOT NULL,
  statut VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE message (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ticket_id INT NOT NULL,
  contenu TEXT NOT NULL,
  FOREIGN KEY (ticket_id) REFERENCES ticket(id)
);

CREATE TABLE agence (
  id INT PRIMARY KEY AUTO_INCREMENT,
  adresse_id INT NOT NULL,
  nom VARCHAR(100) NOT NULL,
  FOREIGN KEY (adresse_id) REFERENCES adresse(id)
);

CREATE TABLE voiture (
  id INT PRIMARY KEY AUTO_INCREMENT,
  categorie VARCHAR(50) NOT NULL,
  agence_id INT NOT NULL,
  disponibilite BOOLEAN NOT NULL,
  acrissCode VARCHAR(10) NOT NULL,
  marque VARCHAR(100) NOT NULL,
  puissance_ch INT NOT NULL,
  prix_par_jour DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (agence_id) REFERENCES agence(id)
);

CREATE TABLE reservation (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  voiture_id INT NOT NULL,
  date_debut_reservation DATE NOT NULL,
  date_fin_reservation DATE NOT NULL,
  montant DECIMAL(10,2) NOT NULL,
  statut VARCHAR(50) NOT NULL,
  ville_de_depart VARCHAR(100) NOT NULL,
  ville_de_fin VARCHAR(100) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (voiture_id) REFERENCES voiture(id)
);
