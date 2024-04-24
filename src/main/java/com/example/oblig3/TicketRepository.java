package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

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
        return db.query(sql, new BeanPropertyRowMapper<>(Ticket.class));
    }

    public Ticket getOneTicket(int id) {
        Object[] param = new Object[1];
        param[0] = id;
        String sql = "SELECT * FROM Ticket WHERE id=?";
        Ticket oneTicket = db.queryForObject(sql, param, BeanPropertyRowMapper.newInstance(Ticket.class));
        return oneTicket;
    }

    public void changeOne(Ticket inTicket) {
        String sql = "UPDATE Ticket SET movie=?, number=?, firstname=?, lastname=?, phoneNb=?, email=? WHERE id=?";
        db.update(sql, inTicket.getMovie(), inTicket.getNumber(), inTicket.getFirstname(), inTicket.getLastname(), inTicket.getPhoneNb(), inTicket.getEmail(), inTicket.getId());
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
        return db.query(sql, new BeanPropertyRowMapper<>(Movie.class));
    }
}
