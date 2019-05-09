package com.admir.demiraj.datacatalogspringboot.dao;


import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import junit.runner.Version;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class VersionDAOTest {


    @Autowired
    VersionDAO versionDAO;

    @Test
    public void whenFindByName_thenReturnEmployee() {
        // given
       Versions cdever = versionDAO.getLastCdeVersion();

       String cdeName = cdever.getName();
        // then
        assertThat(cdeName).contains("v");
                //.isEqualTo(alex.getName());
    }
}
