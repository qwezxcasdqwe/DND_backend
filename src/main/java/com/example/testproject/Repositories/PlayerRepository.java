package com.example.testproject.Repositories;

import com.example.testproject.Models.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player,Long> {
    Optional<Player> findById(Long id);
    Optional<Player> findPlayerByEmail(String email);

    Player findByLogin(String login);
    Player deletePlayerByLogin(String login);



}
