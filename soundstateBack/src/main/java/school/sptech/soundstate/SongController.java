package school.sptech.soundstate;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/songs")

public class SongController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/")
    private ResponseEntity<List<Song>> getAllSongs() {
        String sql = "SELECT * FROM songs";
        return ResponseEntity.status(200).body((jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Song.class))));
    }

    @PostMapping()
    private ResponseEntity<Song> registerSong(@RequestBody Song body) {

        if(
                        body.getName().isEmpty() ||
                        body.getAlbum().isEmpty() ||
                        (body.getYear() == null || body.getYear() > 2026) ||
                        body.getArtist().isEmpty() ||
                        body.getGenre().isEmpty()
        ) {
            return ResponseEntity.status(400).build();
        }



        String sql = String.format("INSERT INTO songs VALUES (default, ?, ?, ?, ?, %d)", body.getYear(),
                body.getName(), body.getArtist(), body.getGenre(), body.getAlbum(), body.getYear());

        KeyHolder keyHolder = new GeneratedKeyHolder();

        try {
            jdbcTemplate.update( con -> {
                PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

                ps.setString(1, body.getName());
                ps.setString(2, body.getArtist());
                ps.setString(3, body.getGenre());
                ps.setString(4, body.getAlbum());

                return ps;
            }, keyHolder);

            Integer id = keyHolder.getKeyAs(Integer.class);
            body.setId(id);
        } catch(DuplicateKeyException d) {
            return ResponseEntity.status(409).build();
        }

        return ResponseEntity.status(201).body(body);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<String> deleteFromID(@PathVariable Integer id) {
        String sql = "DELETE FROM songs WHERE id = ?";

        if (getCheckId(id) != 1) {
            return ResponseEntity.status(404).build();
        }

        try {
            jdbcTemplate.update(sql, id);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("ID not found.");
        }

        return ResponseEntity.status(204).body("Successfully deleted.");
    }

    @PutMapping("/{id}")
    private ResponseEntity<String> putFromID(@PathVariable Integer id, @RequestBody Song body) {
        String sql = "UPDATE SONGS SET \"name\" = ?, \"artist\" = ?, \"genre\" = ?, \"album\" = ?, \"year\" = ? WHERE ID = ?";

        if (getCheckId(id) != 1) {
            return ResponseEntity.status(404).build();
        }

        try {
            jdbcTemplate.update(sql,body.getName(), body.getArtist(), body.getGenre(), body.getAlbum(), body.getYear(), id);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getLocalizedMessage());
        }

        return ResponseEntity.status(204).body("Successfully updated.");
    }

    private @Nullable Integer getCheckId(Integer id) {
        String sqlCheckId = "SELECT COUNT(*) FROM songs WHERE ID = ?";
        return jdbcTemplate.queryForObject(
                sqlCheckId,
                Integer.class,
                id
        );
    }




}

