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
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/songs")
public class SongController {



    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final BeanPropertyRowMapper<Song> mapper = new BeanPropertyRowMapper<>(Song.class);

    @GetMapping()
    private ResponseEntity<List<Song>> getAllSongs() {
        String sql = "SELECT * FROM songs";
        return ResponseEntity.status(200).body((jdbcTemplate.query(sql, mapper)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Song> getSongFromID(@PathVariable Integer id) {

        Song foundSong;

        try {
            foundSong = jdbcTemplate.queryForObject("SELECT * FROM songs WHERE id = ?", mapper, id);
        } catch(Exception e) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(200).body(foundSong);
    }

    @PostMapping()
    private ResponseEntity<Song> registerSong(@RequestBody Song body) {

        if (body == null ||
                isBlank(body.getName()) ||
                isBlank(body.getAlbum()) ||
                isBlank(body.getArtist()) ||
                isBlank(body.getGenre()) ||
                body.getYear() == null || body.getYear() <= 0 || body.getYear() > 2026 ||
                body.getDurSec() == null || body.getDurSec() <= 0 ||
                isBlank(body.getArtwork())
        ) {
            return ResponseEntity.status(400).build();
        }

        String sql = "INSERT INTO songs VALUES (default, ?, ?, ?, ?, ?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        try {
            jdbcTemplate.update( con -> {
                PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

                ps.setString(1, body.getName());
                ps.setString(2, body.getArtist());
                ps.setString(3, body.getGenre());
                ps.setString(4, body.getAlbum());
                ps.setInt(5, body.getYear());
                ps.setInt(6, body.getDurSec());
                ps.setString(7, body.getArtwork());

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
        String sql = "UPDATE SONGS SET name = ?, artist = ?, genre = ?, album = ?, year = ?, durSec = ?, artwork = ? WHERE ID = ?";

        if(body == null || id == null) {
            return ResponseEntity.status(400).build();
        }

        if (getCheckId(id) != 1) {
            return ResponseEntity.status(404).build();
        }

        try {
            jdbcTemplate.update(sql,body.getName(), body.getArtist(), body.getGenre(), body.getAlbum(), body.getYear(), body.getDurSec(), body.getArtwork(), id);
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

    private boolean isBlank(String s) {
        return s == null || s.isBlank();
    }




}

