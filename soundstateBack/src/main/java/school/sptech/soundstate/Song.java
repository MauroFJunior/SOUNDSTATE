package school.sptech.soundstate;

public class Song {
    private Integer id;
    private String name;
    private String artist;
    private String genre;
    private String album;
    private Integer year;
    private Integer durSec;
    private String artwork;

    public Song(Integer id, String name, String artist, String genre, String album, Integer year, Integer durSec, String artwork) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.genre = genre;
        this.album = album;
        this.year = year;
        this.durSec = durSec;
        this.artwork = artwork;
    }

    public Song() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getDurSec() { return durSec; }

    public void setDurSec(Integer durSec) { this.durSec = durSec; }

    public String getArtwork() { return artwork; }

    public void setArtwork(String artwork) { this.artwork = artwork; }
}
