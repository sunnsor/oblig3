package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController

public class TicketController {
@Autowired
private TicketRepository rep;

    @PostMapping ("/saveTicket")
    public void saveTicket (Ticket inTicket) {
        rep.saveTicket(inTicket);
    }

    @GetMapping ("/getMovie")
    public List<Movie> movies() {
        List<Movie> newMovie = new ArrayList<>();
        newMovie.add(new Movie("Back To Black"));
        newMovie.add(new Movie("One Life"));
        newMovie.add(new Movie("Ibelin"));
        return newMovie;
    }

    @GetMapping ("/getTicket")
    public List<Ticket> ticket() {
        return tickets;
    }

    @GetMapping ("/deleteTicket")
    public void deleteTicket () {
        tickets.clear();
    }

    }
