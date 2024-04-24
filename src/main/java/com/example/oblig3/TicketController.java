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
        return rep.getMovie();
    }

    @GetMapping ("/getTicket")
    public List<Ticket> ticket() {
        return rep.getTicket();
    }

    @GetMapping ("/deleteTicket")
    public void deleteTicket () {
        rep.deleteTicket();
    }
    @GetMapping("/deleteOne")
        public void deleteOne(int id) {
        rep.deleteOne(id);
    }

    }
