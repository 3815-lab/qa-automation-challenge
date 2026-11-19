package demoblaze;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import org.junit.jupiter.api.Test;

class DemoblazeApiTest {

    private static final int THREADS = 4;

    // Corre todos los features en paralelo. Para filtrar: -Dkarate.options="--tags @login"
    @Test
    void runAll() {
        Results results = Runner.path("classpath:demoblaze")
                .tags("~@ignore")
                .outputCucumberJson(true)
                .parallel(THREADS);

        assertEquals(0, results.getFailCount(), results.getErrorMessages());
    }
}
