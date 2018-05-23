package br.com.elmoreplus.repository;

import br.com.elmoreplus.domain.Page;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Page entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PageRepository extends JpaRepository<Page, Long> {

    @Query("select page from Page page where page.user.login = ?#{principal.username}")
    List<Page> findByUserIsCurrentUser();

}
