package school.sptech.soundstate;

public class Song {
    private Integer id;
    private String name;
    private String artist;
    private String genre;
    private String album;
    private Integer year;

    public Song(Integer id, String name, String artist, String genre, String album, Integer year) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.genre = genre;
        this.album = album;
        this.year = year;
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
}
