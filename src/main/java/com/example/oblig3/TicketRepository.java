package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TicketRepository {
    @Autowired
    private JdbcTemplate db;

    public void saveTicket(Ticket inTicket){
        String sql = "INSERT INTO Ticket(movie, number, firstname, lastname, phoneNb, email) VALUES (?,?,?,?,?,?)";
        db.update(sql, inTicket.getMovie(), inTicket.getNumber(), inTicket.getFirstname(), inTicket.getLastname(), inTicket.getPhoneNb(), inTicket.getEmail());
    }
    public List<Ticket> getTicket() {
        String sql = "SELECT * FROM Ticket ORDER BY lastname";
        return db.query(sql, new BeanPropertyRowMapper(Ticket.class));
    }

    public void deleteOne(int id) {
        String sql = "DElETE FROM Ticket WHERE id=?";
        db.update(sql, id);
    }

    public void deleteTicket() {
        String sql = "DELETE FROM Ticket";
        db.update(sql);
    }

    public List<Movie> getMovie() {
        String sql = "SELECT * FROM Movie";
        return db.query(sql, new BeanPropertyRowMapper(Movie.class));
    }
}
